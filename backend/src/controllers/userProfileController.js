import User from '../models/userModel.js';


const editUser = async (req, res) => {
    const userId = req.params.uuid;  
    console.log(userId);
    const updatedData = req.body;     

    try {
        const updatedUser = await User.findOneAndUpdate(
            { uuid: userId },       
            updatedData             
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found', id: userId });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
     const userId = req.params.uuid;
    try {
        const deletedUser = await User.findOneAndDelete({ uuid: userId });

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};


export { editUser, deleteUser };