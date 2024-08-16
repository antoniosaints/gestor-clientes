export default interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  status: string;
  regra: string;
  grupoId: number;
  anotacoes?: string;
  telefone?: string;
  dataCriacao?: Date;
}
