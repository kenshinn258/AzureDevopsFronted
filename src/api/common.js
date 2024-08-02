import { adapter, instance } from './axios'
import { useQuery, useMutation } from '@tanstack/vue-query'

export const useLogin = () =>
  useMutation({
    mutationFn: data => instance.post('/user/login', data),
  })

export const useRegister = () =>
  useMutation({
    mutationFn: data => instance.post('/user/registerAcc', data),
  })

export const useVerify = () =>
  useMutation({
    mutationFn: data => instance.post(`/user/verify${data.type === 'E' ? 'Email' : 'Phone'}`, data),
  })

export const useReSend = () =>
  useMutation({
    mutationFn: data => instance.post('/user/reSendVerifyCode', data),
  })

export const useCheckCode = () =>
  useMutation({
    mutationFn: data => instance.post('/user/checkPinCode', data),
  })

export const useResetPwd = () =>
  useMutation({
    mutationFn: data => instance.post('/user/resetPwd', data),
  })

export const useForgetPwd = () =>
  useMutation({
    mutationFn: data => instance.post('/user/forgetPwd', data),
  })

export const getMenuList = () =>
  useMutation({
    mutationFn: data => instance.get('/menuList/retrieveMenu', { params: data }),
  })
  // useQuery({
  //   queryKey: ['/menuList/retrieveMenu'],
  //   queryFn: adapter.get,
  // })
