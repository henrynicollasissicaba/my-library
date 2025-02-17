import { currentUser } from "@clerk/nextjs/server";
import { getUserAction } from "@/actions/user-actions";
import DashboardCard from "@/app/components/ui/DashboardCard";
import { getTotalBooksAction } from "@/actions/book-actions";
import { BOOK_STATUS } from "@/models/Book";
import { getTotalNotesAction } from "@/actions/note-actions";
import { Suspense } from "react";
import Loading from "@/app/components/layout/LoadingPage";

interface DashboardData {
  id: number
  titleInfo: string
  subtitleInfo: string
  numberInfo: number
}

export default async function Home() {
  const clerkUser = await currentUser()
  if(!clerkUser) return 

  const userData = {
    id: clerkUser.id,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    email: clerkUser.emailAddresses[0].emailAddress || ""
  }

  const user = await getUserAction(userData)

  const [totalBooks, totalNotes, readBooks, readingBooks, nonReadBooks] = await Promise.all([
    getTotalBooksAction(),
    getTotalNotesAction(),
    getTotalBooksAction(BOOK_STATUS.READ),
    getTotalBooksAction(BOOK_STATUS.READING),
    getTotalBooksAction(BOOK_STATUS.NON_READ)
  ])

  const data: DashboardData[] = [
    { id: 1, titleInfo: "Você possui um total de", subtitleInfo: "livros cadastrados", numberInfo: totalBooks ?? 0 },
    { id: 2, titleInfo: "Você possui um total de", subtitleInfo: "anotações criadas", numberInfo: totalNotes ?? 0 },
    { id: 3, titleInfo: "Você possui", subtitleInfo: "livros lidos", numberInfo: readBooks ?? 0 },
    { id: 4, titleInfo: "Você está lendo", subtitleInfo: "livros atualmente", numberInfo: readingBooks ?? 0 },
    { id: 5, titleInfo: "Você possui", subtitleInfo: "livros não lidos", numberInfo: nonReadBooks ?? 0 },
  ]

  return (
    <main className="flex flex-col gap-10">
      <div>
        <h1 
          className="font-bold text-xl mt-4 ml-3 mr-10"
        >
          Início - Painel de: <span className="text-primary-500">{user?.firstName} {user?.lastName}</span>
        </h1>
      </div>
      <Suspense fallback={<Loading />}>
        <div className="flex gap-6 justify-center flex-wrap mb-8">
          {data.map((item) => (
            <DashboardCard 
              key={item.id} 
              titleInfo={item.titleInfo} 
              subtitleInfo={item.subtitleInfo} 
              numberInfo={item.numberInfo}
            />
          ))}
        </div>
      </Suspense>
    </main>
  );
}
