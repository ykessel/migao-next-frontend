export enum REPORT_REASON {
    FRAUDULENT_LISTING = 'FRAUDULENT_LISTING',
    INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
    MISLEADING_INFORMATION = 'MISLEADING_INFORMATION',
    DUPLICATE_LISTING = 'DUPLICATE_LISTING',
    PROPERTY_NOT_AVAILABLE = 'PROPERTY_NOT_AVAILABLE',
    INCORRECT_PRICING = 'INCORRECT_PRICING',
    SPAM_OR_FAKE = 'SPAM_OR_FAKE',
    DISCRIMINATION = 'DISCRIMINATION',
    UNSAFE_PROPERTY = 'UNSAFE_PROPERTY',
    COPYRIGHT_VIOLATION = 'COPYRIGHT_VIOLATION',
    SCAM_OR_PHISHING = 'SCAM_OR_PHISHING',
    OTHER = 'OTHER',
}

export const REPORT_REASON_LABELS: Record<REPORT_REASON, string> = {
    [REPORT_REASON.FRAUDULENT_LISTING]: 'Listado Fraudulento',
    [REPORT_REASON.INAPPROPRIATE_CONTENT]: 'Contenido Inapropiado',
    [REPORT_REASON.MISLEADING_INFORMATION]: 'Información Engañosa',
    [REPORT_REASON.DUPLICATE_LISTING]: 'Listado Duplicado',
    [REPORT_REASON.PROPERTY_NOT_AVAILABLE]: 'Propiedad No Disponible',
    [REPORT_REASON.INCORRECT_PRICING]: 'Precio Incorrecto',
    [REPORT_REASON.SPAM_OR_FAKE]: 'Spam o Falso',
    [REPORT_REASON.DISCRIMINATION]: 'Discriminación',
    [REPORT_REASON.UNSAFE_PROPERTY]: 'Propiedad Insegura',
    [REPORT_REASON.COPYRIGHT_VIOLATION]: 'Violación de Derechos de Autor',
    [REPORT_REASON.SCAM_OR_PHISHING]: 'Estafa o Phishing',
    [REPORT_REASON.OTHER]: 'Otro',
};

export const REPORT_REASON_DESCRIPTIONS: Record<REPORT_REASON, string> = {
    [REPORT_REASON.FRAUDULENT_LISTING]: 'La propiedad no existe o es falsa',
    [REPORT_REASON.INAPPROPRIATE_CONTENT]: 'Contenido ofensivo o inapropiado',
    [REPORT_REASON.MISLEADING_INFORMATION]: 'Información falsa o engañosa',
    [REPORT_REASON.DUPLICATE_LISTING]: 'Misma propiedad listada múltiples veces',
    [REPORT_REASON.PROPERTY_NOT_AVAILABLE]: 'La propiedad no está disponible para alquiler',
    [REPORT_REASON.INCORRECT_PRICING]: 'El precio mostrado no es correcto',
    [REPORT_REASON.SPAM_OR_FAKE]: 'Listado spam o completamente falso',
    [REPORT_REASON.DISCRIMINATION]: 'Discriminación en el listado',
    [REPORT_REASON.UNSAFE_PROPERTY]: 'La propiedad presenta condiciones inseguras',
    [REPORT_REASON.COPYRIGHT_VIOLATION]: 'Uso no autorizado de contenido protegido',
    [REPORT_REASON.SCAM_OR_PHISHING]: 'Intento de estafa o phishing',
    [REPORT_REASON.OTHER]: 'Otra razón no especificada',
};