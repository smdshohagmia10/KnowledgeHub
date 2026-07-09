"use client";

import { postReview } from "@/lib/action/review";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Label,
  Modal,
  Radio,
  RadioGroup,
  Surface,
  TextArea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaBookOpen, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

export function ReviewModal({ book }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter()

  const handelSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const payload = {
    review: formData.get("review"),
    rating: formData.get("book-rating"),
    bookId : book?._id,
    bookImage: book?.coverImage,
    bookTitle : book?.title,
    userId: user?.id,
    userImage: user?.image,
    userName: user?.name,
  };

  const res = await postReview(payload);
  if(res){
    toast.success("Thanks For Your Feedback")
    router.refresh();
  }
};
  return (
    <Modal>
      <Button variant="secondary">Give a Review</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground flex items-center justify-center p-2 rounded-full w-10 h-10">
                <FaBookOpen size={20} />
              </Modal.Icon>
              <Modal.Heading>Give Book Review</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
                  <Label>Book Rating</Label>
                  <RadioGroup
                    defaultValue="5"
                    name="book-rating"
                    orientation="horizontal"
                  >
                    {["1", "2", "3", "4", "5"].map((star) => (
                      <Radio key={star} value={star}>
                        <Radio.Content>
                          <Radio.Control>
                            <Radio.Indicator />
                          </Radio.Control>
                          <span className="flex items-center gap-1">
                            {star}{" "}
                            <FaStar className="text-amber-500" size={12} />{" "}
                          </span>
                        </Radio.Content>
                      </Radio>
                    ))}
                  </RadioGroup>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="textarea-rows-3">Your feedback</Label>
                    <TextArea
                      aria-label="Short feedback"
                      name="review"
                      id="textarea-rows-3"
                      placeholder="Something about this book..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button  type="submit">
                      Submit Review
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
