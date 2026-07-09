"use client";

import { bookDelete } from "@/lib/apis/books";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function BookDeleteAlart({bookId}) {
    const router = useRouter()
    const handleDelete = async () => {
        try {
            const res = await bookDelete(bookId)
            if(res){
                toast.warning("The Book is delete permanently")
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to delete book", error);
        }
    };
  return (
    <AlertDialog>
      <Button
        size="sm"
        className="border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-red-600 hover:text-white hover:border-red-600 font-medium"
      >
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Book permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="danger">
                Delete Book
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
