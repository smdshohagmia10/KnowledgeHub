"use client";

import {
  Button,
  Label,
  Modal,
  Surface,
  TextArea,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { FaBookOpen, FaEdit } from "react-icons/fa";
import { editeReview } from "@/lib/action/review";

export function EditeModal({ treview }) {
  const router = useRouter();

const handelSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const payload = {
    review: formData.get("review"),
  };

  const res = await editeReview(
    treview._id,
    payload
  );

  if (res) {
    toast.success("Review updated successfully");
    router.refresh();
  }
};

  return (
    <Modal>
      <Button variant="secondary">
        <FaEdit />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground flex items-center justify-center p-2 rounded-full w-10 h-10">
                <FaBookOpen size={20} />
              </Modal.Icon>

              <Modal.Heading>Edit Book Review</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handelSubmit}
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="review">
                      Your Feedback
                    </Label>

                    <TextArea
                      id="review"
                      name="review"
                      defaultValue={treview?.review}
                      placeholder="Something about this book..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>

                    <Button type="submit">
                      Update Review
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}