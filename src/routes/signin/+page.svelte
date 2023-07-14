<script>
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form method="post">
			<div class="mb-6">
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
				<input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email@email.com" required>
			</div> 
			<div class="mb-6">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
				<input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required>
			</div> 
			<button type="submit" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			Not a member?
			<a href="/signup" class="font-semibold leading-6 text-orange-600 hover:text-orange-500"
				>Sign up</a
			>
		</p>
	</div>
</div>
