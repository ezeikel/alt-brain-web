import { getAudioNotes } from '@/app/actions';

const Dashboard = async () => {
  const audioNotes = await getAudioNotes();

  return (
    <div>
      <section>
        {audioNotes.map((note) => (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <audio controls src={note.audioUrl} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
