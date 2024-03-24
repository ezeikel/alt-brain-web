'use client';

import { useRef, useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import cn from '@/utils/cn';
import { addVoiceNote } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type AddVoiceNoteFormProps = {
  className?: string;
};

const AddVoiceNoteForm = ({ className }: AddVoiceNoteFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useSession();
  const userId = data?.userId;

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const addNoteWithId = addVoiceNote.bind(null, userId);

  const startSpeaking = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
        setIsSpeaking(true);

        recorder.ondataavailable = (e: BlobEvent) => {
          setAudioBlob(e.data);
        };
      })
      .catch(console.error);
  };

  const stopSpeaking = () => {
    mediaRecorder?.stop();
    setIsSpeaking(false);
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      if (audioBlob) {
        formData.append('audio', audioBlob);
      }
      await addNoteWithId(formData); // Assuming addNoteWithId can handle FormData
      formRef.current.reset();
      setAudioBlob(null); // Reset the blob after submitting
    }
  };

  return (
    <div className={cn({ [className as string]: !!className })}>
      <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
        Add a note
      </h1>
      <form
        className="flex flex-wrap gap-4 p-4 m-auto"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Label htmlFor="title">Title</Label>
        <Input name="title" />
        {audioBlob ? (
          <audio controls src={URL.createObjectURL(audioBlob)} />
        ) : null}
        <Button type="button" onClick={toggleSpeaking}>
          {isSpeaking ? 'Stop Recording' : 'Record'}
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddVoiceNoteForm;
