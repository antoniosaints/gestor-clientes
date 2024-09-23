import { Request, Response } from 'express';
import HttpErrorService from "../services/http_error_service";
import prismaService from "../services/prisma_service";
import ResponseService from "../services/response_service";
import validateSchema from '../services/validade_schema';
import { createCliente as createClienteSchema, updateCliente as updateClienteSchema } from '../schemas/cliente_schema';
export const createCliente = async (req: Request, res: Response) => {
  
  try {
    const validated = validateSchema(createClienteSchema, req.body);
    const cliente = await prismaService.cliente.create({
      data: validated,
    });
    ResponseService.created(res, {
      message: "Cliente criado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await prismaService.cliente.findMany({
      where: { contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: clientes });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const getCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("ID obrigatorio");
    const cliente = await prismaService.cliente.findUnique({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, { data: cliente });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const validated = validateSchema(updateClienteSchema, req.body);
    const cliente = await prismaService.cliente.update({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
      data: validated,
    });
    ResponseService.success(res, {
      message: "Cliente atualizado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await prismaService.cliente.delete({
      where: { id: Number(id), contaSistemaId: req.body.contaSistemaId },
    });
    ResponseService.success(res, {
      message: "Cliente deletado com sucesso",
      data: cliente,
    });
  } catch (error: any) {
    HttpErrorService.hadle(error, res);
  }
};
