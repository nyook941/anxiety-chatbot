interface MoodSliceState {
  moodArr: Mood[];
}

interface Mood {
  date: string;
  moods: string[];
}

export { MoodSliceState, Mood };
