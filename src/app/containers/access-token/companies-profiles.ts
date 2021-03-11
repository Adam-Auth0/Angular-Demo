
import { Company, Profile } from './classes';

export const Companies: Company[] = [
    { id: 1, name: 'blazeAutomation', description: 'Blaze Automation Ltd' },
    { id: 3, name: 'greenTextiles', description: 'Green Textiles Ltd' },
    { id: 7, name: 'industrialValves', description: 'Industrial Valves Ltd' },
    { id: 8, name: 'precisionComponents', description: 'Precision Components Plc' },
    { id: 9, name: 'holisticAviation', description: 'Holistic Aviation Plc'}
];

export const Profiles: Profile[] = [
    { compid: 1, name: 'exportAdmin', description: 'Export Administrator' },
    { compid: 1, name: 'complianceOfficer', description: 'Compliance Officer' },
    { compid: 1, name: 'seniorManager', description: 'Senior Manager' },
    { compid: 3, name: 'internalUser', description: 'Internal User' },
    { compid: 3, name: 'externalUser', description: 'External User' },
    { compid: 7, name: 'administrator', description: 'Administrator' },
    { compid: 8, name: 'exportOfficer', description: 'Export Officer' },
    { compid: 8, name: 'importOfficer', description: 'Import Officer' },
    { compid: 8, name: 'manager:', description: 'Manager' },
    { compid: 9, name: 'exportController:', description: 'Export Controller' },
    { compid: 9, name: 'importController:', description: 'Import Controller' }
];