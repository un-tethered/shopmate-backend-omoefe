const checkAuthStatus = (user) => {
  if (!user) throw new Error('Unauthorized')
}

export { checkAuthStatus as default }
