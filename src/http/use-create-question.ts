import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateQuestionRequest } from './types/create-question-request'
import type { CreateQuestionResponse } from './types/create-question-response'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ question }: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question,
          }),
        }
      )

      const result: CreateQuestionResponse = await response.json()

      return result
    },
    //Executa no momento que for feita a chamada para a API
    onMutate: ({ question }) => {
      const data = queryClient.getQueryData<GetRoomQuestionsResponse>([
        'get-questions',
        roomId,
      ])

      const questions = data?.questions

      const questionsArray = questions ?? []

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      }

      // Atualiza previamente os dados da query com a nova pergunta
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        {
          questions: [newQuestion, ...questionsArray],
        }
      )

      return { newQuestion, questions }
    },
    // Executa quando a mutation for bem-sucedida
    onSuccess: (data, _variables, context) => {
      // context vem do onMutate
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        (oldData) => {
          if (!oldData) {
            return oldData
          }

          if (!context.newQuestion) {
            return oldData
          }

          return {
            questions: oldData.questions.map((question) => {
              if (question.id === context.newQuestion.id) {
                return {
                  ...context.newQuestion,
                  id: data.questionId, // Atualiza o ID da pergunta com o ID retornado pela API
                  answer: data.answer,
                  isGeneratingAnswer: false,
                }
              }

              return question
            }),
          }
        }
      )
    },
    // Executa quando a mutation falhar
    onError: (_error, _variables, context) => {
      if (context?.questions) {
        queryClient.setQueryData(['get-questions', roomId], context.questions)
      }
    },
  })
}
