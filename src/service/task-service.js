import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createTaskValidation,
  updateStatusTaskValidation,
  updateTaskValidation,
} from "../validation/task-validation.js";
import { validate } from "../validation/validation.js";

const getAll = async (request) => {
  const username = request.user.username;
  const status = request.query.status;

  const whereClause = {
    username,
    ...(status && { status }),
  };

  const tasks = await prismaClient.task.findMany({
    where: whereClause,
  });

  if (tasks.length < 1) {
    return {
      message: "tasks not found",
      data: tasks,
    };
  }

  return {
    data: tasks,
  };
};

const get = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "Task not found.");
  }

  const task = await prismaClient.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    throw new ResponseError(404, "Task not found.");
  }

  if (task.username !== username) {
    throw new ResponseError(403, "You do not have permission to access this task.");
  }

  return {
    data: task,
  };
};

const create = async (request) => {
  const username = request.user.username;

  const newTask = validate(createTaskValidation, request.body);

  return prismaClient.task.create({
    data: { ...newTask, username: username },
  });
};

const remove = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "Task not found.");
  }

  const task = await prismaClient.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    throw new ResponseError(404, "Task not found.");
  }

  if (task.username !== username) {
    throw new ResponseError(403, "You do not have permission to delete this task.");
  }

  await prismaClient.task.delete({
    where: {
      id: id,
    },
  });

  return {
    message: `Task ${id} removed successfully`,
  };
};

const update = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "Task not found.");
  }

  const task = await prismaClient.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    throw new ResponseError(404, "Task not found.");
  }

  if (task.username !== username) {
    throw new ResponseError(403, "You do not have permission to update this task.");
  }

  const updateTask = validate(updateTaskValidation, request.body);

  if (!updateTask || Object.keys(updateTask).length === 0) {
    throw new ResponseError(400, "No data provided for update.");
  }

  const updatedTask = await prismaClient.task.update({
    where: {
      id: id,
    },
    data: updateTask,
  });

  return {
    message: `Task ${id} updated successfully`,
    data: updatedTask,
  };
};

const updateStatus = async (request) => {
  const username = request.user.username;
  const id = parseInt(request.params.id, 10);

  if (Number.isNaN(id)) {
    throw new ResponseError(404, "Task not found.");
  }

  const task = await prismaClient.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    throw new ResponseError(404, "Task not found.");
  }

  if (task.username !== username) {
    throw new ResponseError(403, "You do not have permission to update status this task.");
  }

  const updateStatusTask = validate(updateStatusTaskValidation, request.body);

  await prismaClient.task.update({
    where: {
      id: id,
    },
    data: updateStatusTask,
  });

  return {
    message: `Status Task ${id} updated successfully`,
  };
};

export default {
  getAll,
  get,
  create,
  update,
  updateStatus,
  remove,
};
