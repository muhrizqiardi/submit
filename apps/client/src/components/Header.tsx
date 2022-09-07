function Header(props: { isLoggedIn?: boolean; username?: string }) {
  return (
    <>
      <header className="mb-4 p-2 bg-custom-accent rounded-b-lg text-custom-light leading-none flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-bold">
            <a href="/">{`<submit />`}</a>
          </p>
        </div>
        <div className="inline-flex items-center gap-2">
          <p>
            {props.isLoggedIn ? (
              <a href="/me" className="hover:underline">
                @{props?.username ?? "User"}
              </a>
            ) : null}
            {!props.isLoggedIn ? (
              <a href="/sign-in" className="hover:underline">
                Sign in
              </a>
            ) : null}
          </p>
          {props.isLoggedIn ? (
            <>
              |
              <p>
                <a href="/log-out" className="hover:underline">
                  Log out
                </a>
              </p>
            </>
          ) : null}
        </div>
      </header>
    </>
  );
}

export default Header;
