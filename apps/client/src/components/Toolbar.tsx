function Toolbar() {
  return (
    <div className="mb-4 p-2 rounded-lg bg-custom-light text-custom-dark leading-none flex items-center justify-start gap-3">
      <div className="inline-flex items-center gap-2">
        <span>sort by:</span>
        <select className="p-2 bg-gray-300 hover:bg-gray-400 rounded-lg">
          <option>New</option>
        </select>
      </div>
      |
      <div className="inline-flex items-center gap-2 hover:underline">
        <a href="/new-post">+ submit new post</a>
      </div>
    </div>
  );
}

export default Toolbar;
