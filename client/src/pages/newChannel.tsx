// import React, {
//   FormEvent,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import Select, { SelectInstance } from "react-select";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "src/Context/AuthContext";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Input,
// } from "@material-tailwind/react";

// export function NewChannel() {
//   const { streamChat, user, loading } = useContext(AuthContext);
//   const [users, setUsers] = useState<{ id: string; name?: string }[]>([]);
//   const [isCreating, setIsCreating] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const nameRef = useRef<HTMLInputElement>(null);
//   // const imageUrlRef = useRef<HTMLInputElement>(null);
//   const memberIdsRef =
//     useRef<SelectInstance<{ label: string; value: string }>>(null);

//   useEffect(() => {
//     if (!user || !streamChat) return;

//     const fetchUsers = async () => {
//       try {
//         const response = await streamChat.queryUsers(
//           { roles: { $in: ["user"] } },
//           { name: 1 }
//         );
//         console.log(response);
//         setUsers(response.users);
//       } catch (error) {
//         console.error("Error fetching users from StreamChat:", error);
//       }
//     };

//     fetchUsers();
//   }, [streamChat, user]);

//   const handleSubmit = async (e: FormEvent) => {
//     console.log("heyy");
//     e.preventDefault();
//     console.log("nameRef.current:", nameRef.current); // Vérifiez si la référence est définie
//     const name = nameRef.current?.value;
//     // const imageUrl = imageUrlRef.current?.value;
//     const selectOptions = memberIdsRef.current?.getValue();
//     console.log("données récupérées  ", name, selectOptions);
//     if (!name || !selectOptions || selectOptions.length === 0) return;

//     setIsCreating(true);
//     try {
//       await streamChat
//   //      ?.channel("messaging", crypto.randomUUID(), {
//           name,
//           // image: imageUrl,
//           members: [user!._id, ...selectOptions.map((option) => option.value)],
//         })
//         .create();
//       navigate("/contact");
//     } catch (error) {
//       console.error("Erreur lors de la création du canal:", error);
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   return (
//     <Card>
//       <CardBody>
//         <h1 className="text-3xl font-bold mb-8 text-center">
//           New Conversation
//         </h1>
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
//         >
//           <label htmlFor="name">Name</label>
//           <input id="name" required ref={nameRef} />
//           {/* <label htmlFor="imageUrl">Image Url</label> */}
//           {/* <Input id="imageUrl" ref={imageUrlRef} /> */}
//           <label htmlFor="members">Members</label>
//           <Select
//             ref={memberIdsRef}
//             id="members"
//             required
//             isMulti
//             classNames={{ container: () => "w-full" }}
//             isLoading={loading || !streamChat}
//             options={users.map((user) => ({
//               value: user.id,
//               label: user.name || user.id,
//             }))}
//           />
//           <Button disabled={isCreating} type="submit" className="col-span-full">
//             {isCreating ? "Creating..." : "Create"}
//           </Button>
//         </form>
//       </CardBody>
//       <CardFooter>
//         <Link to="/">Back</Link>
//       </CardFooter>
//     </Card>
//   );
// }
