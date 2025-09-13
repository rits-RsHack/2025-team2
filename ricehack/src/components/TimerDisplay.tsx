interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;

  mode: 'work' | 'break'
}


export default function TimerDisplay({ hours, minutes, seconds, mode }: TimerDisplayProps) {
  return (
    <div className={`text-6xl font-mono font-bold
      ${mode === 'work' ? 'text-black-500' : 'text-red-500'}`}>
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
