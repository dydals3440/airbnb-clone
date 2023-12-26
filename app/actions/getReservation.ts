// action from server component
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  // 내 예약 이런거 볼려면 userId,authorId가 필요함.
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    // 하나의 숙소에 대한 모든 예약을 찾음.
    if (listingId) {
      query.listingId = listingId;
    }
    // user가 예약한 모든 것들을 확인
    if (userId) {
      query.userId = userId;
    }
    // 한 숙소에 대한 다른 예약들을 찾음.
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
