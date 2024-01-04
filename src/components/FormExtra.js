export default function FormExtra() {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          className="h-4 w-4 text-black-600 focus:ring-black-500 border-gray-300 rounded"
        />
        <label
          htmlFor="remember_me"
          className="ml-2 block text-sm text-gray-900"
        >
          Remember me
        </label>
      </div>
      <div className="text-sm">
        <a
          href="a"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  )
}
