const fieldMessage = (name, messages) => {
    const error = messages?.filter?.((err) => err.field === name);
    return error[0]?.message;
};

export default fieldMessage;
