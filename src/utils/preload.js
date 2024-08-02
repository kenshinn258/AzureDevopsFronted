import { useQuery } from '@tanstack/vue-query'
import { toValue } from '@vueuse/core'
import { groupBy, times, map, mapValues, toPairs, toNumber, orderBy } from 'lodash-es'
import { adapter, instance } from '@/api/axios'

const DEFAULT_STALETIME = 30 * 60 * 1000

export const lookupGraduateYearOptions = () => {
  const currentYear = new Date().getFullYear() - 1911
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['lookupGraduateYearOptions', currentYear],
    queryFn: () =>
      Promise.resolve(
        times(5).map(index => {
          const year = currentYear + index
          return {
            label: `${year}年`,
            value: year,
          }
        }),
      ),
  })
}

export const lookupZipOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['/adm-system/zips'],
    queryFn: adapter.get,
    select: result =>
      map(result, codeZip => ({
        value: codeZip.zip,
        label: `(${codeZip.zip})${codeZip.areaname}`,
      })),
  })
}

export const lookupIndustryOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['lookupIndustryOptions'],
    queryFn: async () => {
      const [unitType, { rType, rType2 }] = await Promise.all([
        instance.get('/adm-system/type/industries'),
        instance.get('/adm-system/type/industry/ranges'),
      ])
      const rTypeGroupMapping = groupBy(rType, r => r.pType)
      const rType2GroupMapping = groupBy(rType2, r => r.rType)
      return map(unitType, unit => {
        return {
          label: unit.name,
          value: unit.code,
          subOptions: map(rTypeGroupMapping[unit.code] ?? [], r => {
            return {
              label: r.rDesc,
              value: r.rType,
              subOptions: map(rType2GroupMapping[r.rType] ?? [], r2 => {
                return {
                  label: r2.pType2,
                  value: r2.rType2,
                }
              }),
            }
          }),
        }
      })
    },
  })
}

export const lookupUnitTypeOptions = data => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    // queryKey: ['lookupUnitTypeOptions'],
    queryKey: ['/ADM_021L02/utypeOrderBySN', data],
    queryFn: adapter.post,
    // queryFn: () =>
    //   Promise.resolve([
    //     {
    //       value: '02',
    //       label: '政府機關',
    //     },
    //     {
    //       value: '03',
    //       label: '行政法人研究機構 ',
    //     },
    //     {
    //       value: '04',
    //       label: '大學校院',
    //     },
    //     {
    //       value: '05',
    //       label: '民間產業',
    //     },
    //     {
    //       value: '06',
    //       label: '公立研究機關（構）',
    //     },
    //     {
    //       value: '07',
    //       label: '財團法人研究機構',
    //     },
    //   ]),
    select: result =>
      map(result, f => ({
        value: f.uType,
        label: f.uDesc,
      })),
  })
}

export const lookupPatentTypeOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['lookupPatentTypeOptions'],
    queryFn: () =>
      Promise.resolve([
        { value: '1', label: '發明' },
        { value: '2', label: '新型' },
        { value: '3', label: '設計' },
      ]),
  })
}

export const lookupPatentCategoryOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['lookupPatentCategoryOptions'],
    queryFn: () =>
      Promise.resolve([
        { value: '0', label: '半導體' },
        { value: '1', label: '石化' },
        { value: '2', label: '生醫及保健' },
        { value: '3', label: '光電' },
        { value: '4', label: '金屬' },
        { value: '5', label: '通訊' },
        { value: '6', label: '資訊' },
        { value: '7', label: '電子' },
        { value: '8', label: '電機' },
        { value: '9', label: '機械' },
        { value: '10', label: '航太工業' },
        { value: '11', label: '材料技術' },
        { value: '12', label: '運輸工具' },
        { value: '13', label: '綠色能源' },
        { value: '14', label: '紡織' },
        { value: '15', label: '其他製造業' },
        { value: '16', label: '農、林、漁、牧業' },
        { value: '17', label: '食品業' },
        { value: '18', label: '數位內容' },
        { value: '19', label: '資訊服務' },
        { value: '20', label: '技術服務' },
        { value: '21', label: '其他服務' },
      ]),
  })
}

export const lookupCountryOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['/adm-system/countries'],
    queryFn: adapter.get,
    select: result =>
      map(result, c => {
        return {
          label: c.name,
          value: c.code,
        }
      }),
  })
}

export const lookupQualItemOptions = () => {
  const { data } = useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['/PNR013U02/qualItem'],
    queryFn: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            statusCode: 'xxx',
            message: 'xxx',
            qualItem: {
              selfPark: [
                {
                  itemId: 1,
                  itemName: '台灣新創競技場  Taiwan Startup Stadium',
                },
                {
                  itemId: 2,
                  itemName: '青年科技創新創業基地',
                },
              ],
              prize: [
                {
                  itemId: 1,
                  itemName: '創新創業激勵計畫(臺灣)創業傑出獎',
                },
                {
                  itemId: 2,
                  itemName: '經濟部中小企業處新創事業獎(臺灣)',
                },
                {
                  itemId: 3,
                  itemName: 'International Data Group(IDG)DEMO Show(美國)',
                },
                {
                  itemId: 4,
                  itemName: '建置矽谷創新創業平臺計畫',
                },
                {
                  itemId: 5,
                  itemName: 'U-start創新創業計畫 - 獲得計畫第二階段經評選為績優團隊者',
                },
                {
                  itemId: 6,
                  itemName: '德國Red Dot  Award(德國紅點設計大獎) - 獲得紅點最佳設計獎者',
                },
                {
                  itemId: 7,
                  itemName: '德國IF design Award(德國漢諾威工業設計獎) - 獲得年度IF金質獎或學生設計獎百選者',
                },
                {
                  itemId: 8,
                  itemName: 'G-Mark Award(日本通產省優良產品設計獎) - 獲得優良設計百選者(Good Design Best 100 )',
                },
                {
                  itemId: 9,
                  itemName: 'IDEA Award (美國傑出工業設計獎) - 獲得金獎、銀獎或銅獎者',
                },
                {
                  itemId: 10,
                  itemName: '經濟部工業局金點設計獎(臺灣) - 獲得年度最佳設計獎者',
                },
              ],
            },
          })
        }, 1500)
      }), //TODO adapter.get,
    select: result =>
      mapValues(result.qualItem, items => {
        return map(items, item => ({
          label: item.itemName,
          value: item.itemId,
        }))
      }),
  })
  return data
}

export const lookupPlanTypeOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['/PNR012U03/researchNewProduct/planType'],
    queryFn: adapter.get,
    select: result =>
      map(result, planType => {
        return {
          label: planType.name,
          value: planType.code,
        }
      }),
  })
}

export const lookupSchoolOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['/PTM_014B02/realSchoolData'],
    queryFn: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              schoolCode: 'SCH005',
              schoolName: '國立清華大學',
            },
            {
              schoolCode: 'SCH090',
              schoolName: '大仁技術學院',
            },
            {
              schoolCode: 'SCHA03',
              schoolName: '大仁科技大學',
            },
            {
              schoolCode: 'SCH035',
              schoolName: '大同大學',
            },
            {
              schoolCode: 'SCHZ99',
              schoolName: '其他國內學校',
            },
          ])
        }, 1500)
      }), // adapter.post,
    select: result => {
      const schools = map(result, school => {
        return {
          label: school.schoolName,
          value: school.schoolCode,
        }
      })
      schools.push({
        label: '國外學校，請輸入校名',
        value: '',
      })
      return schools
    },
  })
}

export const lookupGradeCtegoryOptions = () => {
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: true,
    placeholderData: [],
    queryKey: ['/PTM_014B02/realCtegoryData'],
    queryFn: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              dcCode: '349900',
              dcName: '其他商業及管理學類[非最新學類代碼]',
            },
            {
              dcCode: 'A0111',
              dcName: '教育學學類',
            },
            {
              dcCode: 'A0112',
              dcName: '幼兒師資教育學類',
            },
            {
              dcCode: 'A0613',
              dcName: '軟體及應用的開發與分析學類',
            },
            {
              dcCode: 'A9999',
              dcName: '其他學類',
            },
          ])
        }, 1500)
      }), // adapter.post,
    select: result =>
      map(result, ctegory => {
        return {
          label: ctegory.dcName,
          value: ctegory.dcCode,
        }
      }),
  })
}

export const lookupGradeCtegoryDeptOptions = ctegoryCode => {
  const enabled = computed(() => toValue(ctegoryCode)?.length > 0)
  return useQuery({
    staleTime: DEFAULT_STALETIME,
    enabled: enabled,
    placeholderData: [],
    queryKey: ['/PTM_014B02/realDeptData', ctegoryCode],
    queryFn: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              depCode: '301208',
              depName: '經濟管理研究所',
            },
            {
              depCode: '309905',
              depName: '人力資源暨公共關係學系',
            },
            {
              depCode: '343403',
              depName: '工業管理(與經營資訊)學系',
            },
            {
              depCode: 'A06134046_01',
              depName: '資訊系統與應用研究所',
            },
            {
              depCode: 'A01111001_01',
              depName: '國際文教與比較教育學系',
            },
          ])
        }, 1500)
      }), // adapter.post,
    select: result => {
      const depts = map(result, dept => {
        return {
          label: dept.depName,
          value: dept.depCode,
        }
      })
      if (toValue(ctegoryCode) === 'A9999') {
        depts.push({
          label: '其他',
          value: '',
        })
      }
      return depts
    },
  })
}
