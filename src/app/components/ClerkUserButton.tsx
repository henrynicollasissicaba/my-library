import { UserButton } from "@clerk/nextjs";

export default function ClerkUserButton() {
  return (
    <UserButton
      appearance={{
        elements: {
          userButtonAvatarBox: { width: "2.5rem", height: "2.5rem" },
          userButtonOuterIdentifier: { color: "white" },
        },
      }}
      showName
    />
  );
}
