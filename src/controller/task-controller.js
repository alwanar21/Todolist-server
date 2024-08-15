import taskService from "../service/task-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await taskService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await taskService.get(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    await taskService.create(req);
    res.status(201).json({
      message: "Task created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await taskService.update(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const result = await taskService.updateStatus(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await taskService.remove(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default {
  getAll,
  get,
  create,
  update,
  updateStatus,
  remove,
};
