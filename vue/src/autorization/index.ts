import { useLoginStore } from '@/stores/login/loginStore';
import { UsuariosPermissoesACL } from './administracao/usuarios_permissao';
import { ClientesPermissoesACL } from './crm/clientes_permissao';
import { IAbility, IEntity } from './types';
import { ScToastUtil } from '@/utils/scToastUtil';

export class Autorize {
    static can(ability: IAbility, entity: IEntity): boolean | void {
        const loginStore = useLoginStore();
        const userData = loginStore.dataUserInfosLogged;
        if (!userData) return ScToastUtil.error("Nenhum usuário autenticado. Por favor, autentique-se e tente novamente.");
        switch (entity) {
            case 'usuarios':
                return UsuariosPermissoesACL.can(userData, ability, entity);
            case 'clientes':
                return ClientesPermissoesACL.can(userData, ability, entity);
            default:
                return false;
        }
    }
}
