"use client";

import { updateuserAsAdmin } from "@/lib/action/users";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function AdminAlart({userId}) {
    const router = useRouter()
    const handelPromotion = async () => {
        try {
          const payload ={
            role : "admin"
          }
            const res = await updateuserAsAdmin(payload,userId)
            if(res){
                toast.success("The User is Prometed as Admin")
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to Promot", error);
        }
    };
  return (
    <AlertDialog>
      <Button
        size="sm"
        className="border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-red-600 hover:text-white hover:border-red-600 font-medium"
      >
        Make Admin
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Make Admin permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handelPromotion} >
                Promot as Admin
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
