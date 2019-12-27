export default (context) => {
    const { store, redirect } = context

    if(!store.state.user) {
        return redirect('/login')
    }
}