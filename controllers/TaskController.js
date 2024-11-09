const Panel = require('../models/Panel')
const { Task } = require('../models/Task')
const PanelController = require('./PanelController')

async function addTask(args){
    const task = new Task({
        title: args.title,
        description: args.description, 
        dueDate: new Date(args.dueDate),
        assignee: args.assignee, 
        columnId: args.columnId,
    })
    
    const panel = await PanelController.getPanel(args.panelId)

    panel.tasks.push(task)
    await panel.save()

    return task
}

async function changeColumn(args){
    const panel = await PanelController.getPanel(args.panelId)
    const task = panel.tasks.id(args.id)

    task.columnId = args.columnId
    await panel.save()

    return task
}

async function removeTask(args){
    const panel = await PanelController.getPanel(args.panelId)
    
    panel.tasks.pull(args.id)
    await panel.save()
    
    return task
}

module.exports = {
    addTask,
    changeColumn,
    removeTask,
}