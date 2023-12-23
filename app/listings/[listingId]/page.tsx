import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

// Server Component라 useRouter안씀.
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  // listing이 null일수도 있다. 처리
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />;
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
