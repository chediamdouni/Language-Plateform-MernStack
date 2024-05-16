import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogBody className="gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <img src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={`text-3xl font-bold leading-[42px] ${className}`}>
            {title}
          </h1>
          {children}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={handleClick}
        >
          {buttonIcon && (
            <img src={buttonIcon} alt="button icon" width={13} height={13} />
          )}{" "}
          &nbsp;
          {buttonText || "Schedule Meeting"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default MeetingModal;
