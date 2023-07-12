import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { makeValidadeCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })


  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidadeCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId
  })

  return reply.status(204).send()
}
