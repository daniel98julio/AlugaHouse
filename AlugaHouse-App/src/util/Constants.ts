export class Constants {
    //Links
    static readonly url_Residences = 'http://localhost:5000/api/Residence';
    static readonly url_ResidenceTypes = 'http://localhost:5000/api/ResidenceType';
    static readonly url_SearchZipCode = 'http://localhost:5000/api/SearchZipCode';

    //Constants Strings
    static readonly PutOperation = 'put';
    static readonly PostOperation = 'post';
    static readonly zipCodeCorrect = /^[0-9]{8}$/;
    static readonly saveSuccess = 'Salvo com Sucesso.';
    static readonly deleteSuccess = 'Deletado com Sucesso.';
    static readonly operationError = 'Ops... Ocorreu um erro.';
}
