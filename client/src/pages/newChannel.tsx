import React, { FormEvent, useEffect, useRef, useState } from "react";
import Select, { SelectInstance } from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";
import { useContext } from "react";
import { useClient } from "src/hooks/useStreamClient";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

interface Request {
  _id: string;
  user_id: string;
  user_name: string;
  tutor_id: string;
  tutor_name: string;
}
const fetchRequests = async (tutorId: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/request/tutor/${tutorId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch requests");
  }
};

export function NewChannel() {
  const { streamToken, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const chatClient = useClient({ user, streamToken });
  const [requests, setRequests] = useState<Request[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const memberIdsRef =
    useRef<SelectInstance<{ label: string; value: string }>>(null);
  

  useEffect(() => {
    const getRequests = async () => {
      if (user) {
        try {
          const requestsData = await fetchRequests(user.id);
          console.log(requestsData);
          setRequests(requestsData);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    };
    getRequests();
  }, [user]);

  const createChannel = async (name: string, memberIds: string[]) => {
    if (chatClient == null) throw Error("Not connected");

    const channel = chatClient.channel("messaging", crypto.randomUUID(), {
      name,
      members: [user!.id, ...memberIds],
    });

    await channel.create();
    navigate("/inbox/tuteur");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const selectOptions = memberIdsRef.current?.getValue();
    if (!name || !selectOptions || selectOptions.length === 0) {
      return;
    }

    const memberIds = selectOptions.map((option) => option.value);
    await createChannel(name, memberIds);
  };

  return (
    <Card>
      <CardBody>
        <h1 className="text-3xl font-bold mb-8 text-center">
          New Conversation
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
        >
          <label htmlFor="name">Name</label>
          <Input id="name" required ref={nameRef} />
          {/* <label htmlFor="imageUrl">Image Url</label>
          <Input id="imageUrl" ref={imageUrlRef} /> */}
          <label htmlFor="members">Members</label>
          <Select
            ref={memberIdsRef}
            id="members"
            required
            isMulti
            classNames={{ container: () => "w-full" }}
            isLoading={false}
            options={requests.map((request) => ({
              value: request.user_id,
              label: request.user_name || request.user_id,
            }))}
          />
          <Button type="submit" className="col-span-full">
            Create
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <Link to="/">Back</Link>
      </CardFooter>
    </Card>
  );
}
