export default function LoginForm() {
  return (
    <form className="mt-4">
      <input
        type="text"
        className="form-control block px-4 py-2 mb-6 text-base text-gray-900 font-normal
        border-2 border-solid border-gray-500 rounded focus:border-purple-400 focus:outline-none"
        placeholder="Username"
      />
      <input
        type="password"
        className="form-control block px-4 py-2 mb-6 text-base text-gray-900 font-normal
        border-2 border-solid border-gray-500 rounded focus:border-purple-400 focus:outline-none"
        placeholder="Password"
      />
    </form>
  );
}
