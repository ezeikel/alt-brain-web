'use client';

import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import cn from '@/utils/cn';
import { addNote } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

type AddVoiceNoteFormProps = {
  className?: string;
};

const AddVoiceNoteForm = ({ className }: AddVoiceNoteFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useSession();
  const userId = data?.userId;

  const addNoteWithId = addNote.bind(null, userId);

  return (
    <div
      className={cn({
        [className as string]: !!className,
      })}
    >
      <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
        Add a note
      </h1>
      <form
        action={async (formData) => {
          await addNoteWithId(formData);

          // reset the form
          formRef.current?.reset();
        }}
        className="flex flex-wrap gap-4 p-4 m-auto"
        ref={formRef}
      >
        <Label htmlFor="title">Title</Label>
        <Input name="title" />
        <Label htmlFor="content">Content</Label>
        <Textarea name="content" className="resize-none" />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default AddVoiceNoteForm;
