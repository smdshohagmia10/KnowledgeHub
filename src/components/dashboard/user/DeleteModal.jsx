"use client";

import { deleteReview } from "@/lib/action/review";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export function DeleteModal({ treview }) {
  const route = useRouter();
  const handelAction = async () => {
    const res = await deleteReview(treview?._id);
    if (res.deletedCount > 0) {
      toast.success("Deleted Successfully");
      route.refresh();
    }
  };
  return (
    <AlertDialog>
      <Button variant="danger">
        <FaTrash className=" text-sm" />
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Review permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handelAction} variant="danger">
                Delete Review
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
