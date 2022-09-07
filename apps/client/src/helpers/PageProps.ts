export default interface PageProps {
  isLoggedIn: boolean;
  user: {
    username: string;
    email: string;
    id: string;
    role: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  } | null;
}
