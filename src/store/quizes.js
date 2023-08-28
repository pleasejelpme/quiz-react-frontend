import { create } from 'zustand'

export const useQuizStore = create((set) => ({
  quizInfo: {},
  quizInfoSubmited: false,
  questions: [],
  questionsCount: 0,

  // update context methods
  setQuizInfo: (newQuizInfo) => set(() => ({ quizInfo: newQuizInfo })),
  setQuizInfoSubmited: () => set({ quizInfoSubmited: true }),
  setQuestions: (newQuestions) => set(() => ({ questions: newQuestions })),
  incrementQuestionsCount: () => {
    set(state => ({ questionsCount: state.questionsCount + 1 }))
  },

  // clean state
  resetQuiz: () => set(() => ({
    quizInfo: {},
    quizInfoSubmited: false,
    questions: [],
    questionsCount: 0
  }))
}))
