import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { isLoaded, user: clerkUser, isSignedIn } = useUser();
  const { userId } = useClerkAuth();

  // Optionally fetch user from our backend to sync with database
  const { data: dbUser, isLoading: isLoadingDb } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    enabled: !!userId && isSignedIn,
  });

  const isLoading = !isLoaded || isLoadingDb;
  const user = dbUser || (clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    profileImageUrl: clerkUser.imageUrl,
  } : null);

  return {
    user,
    isLoading,
    isAuthenticated: isSignedIn && !!user,
    clerkUser,
  };
}
