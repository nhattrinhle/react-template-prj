import { Outlet, Link } from "react-router";
import { useAppSelector } from "../store/hooks";
import { useLogout } from "../hooks/useAuth";
import { Button } from "../components/ui/button";

const Layout: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-svh">
      <nav className="border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">React App</h1>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <Link to="/about" className="hover:underline">
                  About
                </Link>

                <div className="flex items-center gap-3 ml-4">
                  <span className="text-sm text-gray-600">Welcome, {user?.name || "User"}</span>
                  <Button onClick={handleLogout} disabled={logoutMutation.isPending} variant="outline" size="sm">
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
