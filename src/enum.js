import { forEach, get, values, reduce, set } from 'lodash-es'

export const Role = readonly({
  ROLE_ALL: { accType: -1, typeName: '一般登入使用者', roleType: 'X' },
  ROLE_UNKNOWN: { accType: -2, typeName: '所有使用者(含未登入)', roleType: 'X' },

  ROLE_NCA: { accType: 2, typeName: '研發替代役管理帳號', roleType: 'T' },
  ROLE_NCA_DIRECTOR: { accType: 3, typeName: '役政署主管帳號:(組長)', roleType: 'T' },
  ROLE_NCA_NORMAL: { accType: 23, typeName: '內政部一般帳號', roleType: 'T' },

  ROLE_MILITARY: { accType: 6, typeName: '施訓單位', roleType: 'T' },
  ROLE_AUDITOR: { accType: 12, typeName: '審查委員', roleType: 'T' },
  ROLE_RDSS_OFFICE: { accType: 17, typeName: '專案辦公室', roleType: 'T' },
  ROLE_RDSS_OFFICE_PARTNER: { accType: 21, typeName: '合作單位:(台北市電腦公會)', roleType: 'T' },

  ROLE_STUDENT: { accType: 11, typeName: '學生', roleType: 'T' },
  ROLE_RDSSMAN_TRAINING: { accType: 19, typeName: '受訓役男', roleType: 'T' },
  ROLE_RDSSMAN_ISS: { accType: 16, typeName: '產業訓儲替代役役男', roleType: 'T' },
  ROLE_RDSSMAN: { accType: 18, typeName: '研發替代役役男', roleType: 'T' },
  ROLE_RDSSMAN_BEFORE_TRAINING: { accType: 24, typeName: '受訓前役男', roleType: 'F' },
  ROLE_RDSSMAN_ALLOW_TRANS_OUT: { accType: 25, typeName: '轉調役男', roleType: 'F' },

  ROLE_COMPANY_ASKING: { accType: 14, typeName: '員額申請單位', roleType: 'T' },
  ROLE_COMPANY: { accType: 4, typeName: '用人單位', roleType: 'F' },
  ROLE_COMPANY_ISS: { accType: 8, typeName: '產業訓儲替代役用人單位', roleType: 'F' },
  ROLE_COMPANY_RDSS: { accType: 9, typeName: '研發替代役用人單位', roleType: 'F' },

  ROLE_COMPANY_ASKING_BRANCH: { accType: 22, typeName: '員額申請單位分支部門', roleType: 'T' },
  ROLE_COMPANY_BRANCH: { accType: 5, typeName: '用人單位分支部門', roleType: 'F' },

  ROLE_RDSS_OFFICE_SYSOP: {
    accType: 29,
    typeName: '專案辦公室系統管理人員',
    roleType: 'F',
    groups: ['PROJECT_OFFICE'],
  },
  ROLE_RDSS_OFFICE_ADMIN: { accType: 30, typeName: '專案辦公室管理人員', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_ACTIVITY_SETTING: { accType: 31, typeName: '活動建案人員', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_ACTIVITY_CONFIRM: { accType: 32, typeName: '活動簽核人員', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_CONSULT_ACC_SETTING: { accType: 36, typeName: '諮詢單權限設定人員', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_CONSULT_DISPATCH: { accType: 37, typeName: '諮詢單分文', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_CONSULT_PROCESS: { accType: 38, typeName: '諮詢單處理', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_CONSULT_CONFIRM: { accType: 39, typeName: '諮詢單簽核', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_CONSULT_CLOSE: { accType: 40, typeName: '諮詢單結案', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_QUESTIONNAIRE_SETTING: { accType: 41, typeName: '問卷活動設定人員', roleType: 'F', groups: ['PROJECT_OFFICE'] },
  ROLE_QUESTIONNAIRE_QUERY: { accType: 42, typeName: '問卷結果查詢人員', roleType: 'F', groups: ['PROJECT_OFFICE'] },

  ROLE_REC_UNIT: { accType: 60, typeName: '收件執行單位', roleType: 'F', groups: ['POST_APPLICATION_REVIEW'] },
  ROLE_EXAM_HANDLE_UNIT: {
    accType: 61,
    typeName: '審查作業執行單位',
    roleType: 'F',
    groups: ['POST_APPLICATION_REVIEW'],
  },

  ROLE_QSP_SERVICEDOC_CHECK: {
    accType: 70,
    typeName: '服勤文件、契約複審人員',
    roleType: 'F',
    groups: ['SELECTION_ASSIGNMENT'],
  },
  ROLE_QSP_SERVICEDOC_PREVIEW1: {
    accType: 71,
    typeName: '服勤文件、契約預審人員',
    roleType: 'F',
    groups: ['SELECTION_ASSIGNMENT'],
  },
  ROLE_QSP_SERVICEDOC_PREVIEW2: {
    accType: 74,
    typeName: '服勤文件、契約初審人員',
    roleType: 'F',
    groups: ['SELECTION_ASSIGNMENT'],
  },
  ROLE_QSP_SERVICEDOC_ADMIN: {
    accType: 72,
    typeName: '服勤文件、契約主要負責人',
    roleType: 'F',
    groups: ['SELECTION_ASSIGNMENT'],
  },
  ROLE_QSP_RESUME_ADMIN: {
    accType: 73,
    typeName: '學生報名複審負責人',
    roleType: 'F',
    groups: ['SELECTION_ASSIGNMENT'],
  },

  ROLE_COMPANY_RECEIVER: { accType: 81, typeName: '員額接收暫用帳號', roleType: 'F' },
  ROLE_MTM_MANAGER: { accType: 82, typeName: '受訓狀態處理人員', roleType: 'F', groups: ['PEOPLE_MANAGEMENT'] },

  ROLE_RFM_ADMIN: { accType: 90, typeName: '基金管理負責人', roleType: 'F', groups: ['FUND_OPERATIONS'] },
  ROLE_RFM_BUDGET: { accType: 91, typeName: '基金預算處理人員', roleType: 'F', groups: ['FUND_OPERATIONS'] },
  ROLE_RFM_INCOME: { accType: 92, typeName: '費用收入處理人員', roleType: 'F', groups: ['FUND_OPERATIONS'] },
  ROLE_RFM_SALARY: { accType: 93, typeName: '役男薪資處理人員', roleType: 'F', groups: ['FUND_OPERATIONS'] },
  ROLE_RFM_THING: { accType: 94, typeName: '物品管理處理人員', roleType: 'F', groups: ['FUND_OPERATIONS'] },

  ROLE_NCA_00_00: { accType: 100, typeName: '役政署-徵集組', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_01_00: { accType: 110, typeName: '役政署-甄訓組', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_02_00: { accType: 120, typeName: '役政署-權益組', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_02_0A: { accType: 121, typeName: '役政署-權益科', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_02_0B: { accType: 122, typeName: '役政署-保險科', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_02_0C: { accType: 123, typeName: '役政署-後勤科', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_02_0D: { accType: 124, typeName: '役政署-撫恤科', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_03_00: { accType: 130, typeName: '役政署-召集組', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_04_00: { accType: 140, typeName: '役政署-管理組', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_05_00: { accType: 150, typeName: '役政署-秘書室', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_05_0D: { accType: 154, typeName: '役政署-事務科', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_05_0E: { accType: 155, typeName: '役政署-法制科', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_06_00: { accType: 160, typeName: '役政署-政風室', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_07_00: { accType: 170, typeName: '役政署-人事室', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },
  ROLE_NCA_08_00: { accType: 180, typeName: '役政署-會計室', roleType: 'F', groups: ['ORGANIZATION_CATEGORY'] },

  ROLE_QSP_ADMIN: { accType: 181, typeName: '帳號啟用權限', roleType: 'F', groups: ['OTHERS'] },
})

export const RoleAccountType = readonly(reduce(values(Role), (acc, item) => set(acc, item.accType, item), {}))

const roleGroupMapping = reduce(
  values(Role),
  (mapping, item) => {
    forEach(item.groups, group => {
      const roles = get(mapping, group, [])
      roles.push(item)
      set(mapping, group, roles)
    })
    return mapping
  },
  {},
)

export const RoleGroup = readonly({
  PROJECT_OFFICE: { typeName: '專案辦公室', roles: roleGroupMapping['PROJECT_OFFICE'] },
  POST_APPLICATION_REVIEW: { typeName: '員額申請審查', roles: roleGroupMapping['POST_APPLICATION_REVIEW'] },
  SELECTION_ASSIGNMENT: { typeName: '甄選作業', roles: roleGroupMapping['SELECTION_ASSIGNMENT'] },
  PEOPLE_MANAGEMENT: { typeName: '役男管理', roles: roleGroupMapping['PEOPLE_MANAGEMENT'] },
  FUND_OPERATIONS: { typeName: '基金作業', roles: roleGroupMapping['FUND_OPERATIONS'] },
  ORGANIZATION_CATEGORY: { typeName: '役政署組織別', roles: roleGroupMapping['ORGANIZATION_CATEGORY'] },
  OTHERS: { typeName: '其它', roles: roleGroupMapping['OTHERS'] },
})

export const EventType = readonly({
  F03_A: { text: '諮詢申訴' },
  F03_B: { text: '考評實施' },
  F03_C: { text: '轉調審查' },
  F04: { text: '活動' },
  F05: { text: '問卷' },
  F06: { text: '役男回報' },
  F07: { text: '研究發展費(產業訓儲費)' },
  F08_R1: { text: '具體公告事項第一階段' },
  F08_R2: { text: '具體公告事項第二階段' },
  F09_A: { text: '申請廢止' },
  F09_B: { text: '申請轉調' },
  F09_C: { text: '申請出國' },
  F10: { text: '成效回報' },
  F11: { text: '報到' },
  F12: { text: '轉調報到' },
  F13: { text: '服役期滿' },
  F17_A: { text: '服務契約、服勤管理規定(登錄)' },
  F17_B: { text: '服務契約、服勤管理規定(備查)' },
  F18: { text: '資訊需求上傳' },
  F19: { text: '基本資料更新管考事證登錄' },
  F20: { text: '書面契約備查管考事證登錄' },
  F21: { text: '轉調作業之書面契約備查管考事證登錄' },
  F22: { text: '轉調作業之服勤管理規定、服務契約管考事證登錄' },
  F23: { text: '逾期申請出境管考事證登錄' },
  F24: { text: '接收核准同意釋出轉調役男事證登錄' },
  F25: { text: '二次員額核配足額錄用管考事證登錄' },
  F26: { text: '如期繳納研究發展費(產業訓儲費)管考事證登錄' },
  F27: { text: '逾期申請延期返國(公務)管考事證登錄' },
  F28: { text: '逾期申請延期返國(私務)管考事證登錄' },
  F29: { text: '逾期返國事後通報管考事證登錄' },
  F30: { text: '逾期返國未說明原因管考事證登錄' },
  F31: { text: '逕行提早出境(公務)管考事證登錄' },
  F32: { text: '逕行提早出境(私務)管考事證登錄' },
})
