const socketHandler = (io)=>{
    io.on('connection', (socket)=>{
        console.log('a user connected', socket.id)
        socket.on('joinGroup', (groupId)=>{
            socket.join(groupId)
            console.log(`User ${socket.id} joined group ${groupId}`)
        })
        
        socket.on('addExpense',({groupId, expense})=>{
            io.to(groupId).emit('expenseAdded', expense)
        })

        socket.on('disconnect',()=>{
            console.log('user disconnected', socket.id)
        })
    })
}

export default socketHandler