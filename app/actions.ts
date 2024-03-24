'use server';

import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export const addNote = async (
  userId: string | undefined,
  formData: FormData,
) => {
  // retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('You must be logged in to add a note.');
  }

  const rawFormData = {
    title: (formData.get('title') as string) || '',
    content: (formData.get('content') as string) || '',
  };

  const note = await prisma.note.create({
    data: {
      ...rawFormData,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  // update cache
  revalidatePath('/dashboard');

  return note;
};

export const addVoiceNote = async (
  userId: string | undefined,
  formData: FormData,
) => {
  if (!userId) {
    throw new Error('You must be logged in to add a voice note.');
  }

  // retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  const title = (formData.get('title') as string) || '';
  const audioBlob = formData.get('audio');

  if (!(audioBlob instanceof Blob)) {
    throw new Error('No audio file provided.');
  }

  const blob = await put(`${userId}-audio-${Date.now()}`, audioBlob, {
    access: 'public',
  });

  // Create the voiceNote record in the database
  const voiceNote = await prisma.voiceNote.create({
    data: {
      title,
      audioUrl: blob.url,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  // Update cache, if necessary
  revalidatePath('/dashboard');

  return voiceNote;
};

export const getAudioNotes = async () => {
  // TODO: change other functions to use this instead of passing userId directly
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    throw new Error('You must be logged in to view audio notes.');
  }

  const voiceNotes = await prisma.voiceNote.findMany({
    where: {
      userId,
    },
  });

  return voiceNotes;
};
