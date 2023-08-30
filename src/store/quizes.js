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

export const useQuizCompletionStore = create((set) => ({
  quizId: 0,
  quizInfo: [],
  questions: [],
  questionStage: 0,
  questionChoices: [],
  correctAnswers: [],
  userAnswers: [],
  userScore: 0,

  setQuizId: (id) => set(() => ({ quizId: id })),
  setQuizInfo: (quizInfo) => set(() => ({ quizInfo })),
  setQuestions: (questions) => set(() => ({ questions })),
  setQuestionChoices: (choices) => set((state) => ({ questionChoices: [...state.questionChoices, choices] })),
  setCorrectAnswers: (answer) => set((state) => ({ correctAnswers: [...state.correctAnswers, answer] })),
  setUserAnswers: (answer) => set((state) => ({ userAnswers: [...state.userAnswers, answer] })),
  setUserScore: (score) => set((state) => ({ userScore: score })),
  incrementQuestionStage: () => set((state) => ({ questionStage: ++state.questionStage })),

  clearStates: () => set(() => ({
    questions: [],
    questionStage: 0,
    questionChoices: [],
    userAnswers: [],
    correctAnswers: []
  }))
}))
