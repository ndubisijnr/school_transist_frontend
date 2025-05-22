import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator, Platform, StatusBar, Alert,
} from 'react-native';
import {LoginRequest, LoginRequestType} from "@/model/request/auth/LoginRequest";
import {useRef} from "react";
import {useFormik} from "formik";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import auth from "@/store/modules/auth";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "@/store";
import { useRouter, Link } from 'expo-router';
import {showMessage} from "@/utility/hook/useToast";
import {RouterUtil} from "@/utility/RouterUtil";
import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import {Ionicons} from "@expo/vector-icons"

const LoginScreen = () => {
  const [email, setEmail] = useState('anthony.morah11@gmail.com');
  const [password, setPassword] = useState('••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loginRef, setLoginRef] = useState(LoginRequest);
  const dispatch = useDispatch();
  const {loading } = useAppSelector(state => state.auth);
  const router = useRouter();


  async function handleSubmit (values: LoginRequestType){

    console.log("response==========", values)

    dispatch(auth.action.login(values)).then((response: any)=> {
      console.log('response====', response)
      if (response.payload.code === "00"){
          if(response.payload.data.student || response.payload.data.hub) return RouterUtil.navigate('dashboard.homeScreen');
          return RouterUtil.navigate('dashboard.createBusinessScreen');
      }else {
        showMessage(response.payload.message)
      }
    })
  }

  const formik = useFormik({
    initialValues: loginRef,
    onSubmit: handleSubmit,

  })

  return (
      <ContainerScrollViewLayout>
        <View style={styles.contentContainer}>
        <Text style={styles.title}>School Transit</Text>
        

        <View style={styles.inputContainer} className="relative">
          <DefaultTextInput formik={formik} name={"email"} placeholder={"Enter your email"} label={"Email"} />
          {/*<TouchableOpacity  className="absolute right-2 bottom-3">*/}
          {/*  <Ionicons name="chevron-forward-circle-outline" size={35} />*/}
          {/*</TouchableOpacity>*/}
        </View>

        {/*<Text style={styles.heading}>Welcome Back</Text>*/}

        <View style={styles.inputContainer}>
          <DefaultTextInput  secureTextEntry formik={formik} name={"password"} containerClassname={"!mt-5"} placeholder={"••••••••"} label={"Password"} />
        </View>

          <TouchableOpacity style={styles.loginButton} className={loading ? 'bg-black/20' : 'relative bg-[#F15A24]'} onPress={()=> formik.handleSubmit()} disabled={loading}>
            {loading && (<ActivityIndicator size="small" color={"white"} className="absolute left-0 right-0 top-0 bottom-0" />)}
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        
        <TouchableOpacity style={styles.signupContainer} onPress={() => RouterUtil.navigate('auth.register')}>
          <Text style={styles.signupText}>Dont have an account? </Text>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </ContainerScrollViewLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'center',

  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F15A24',
    marginBottom: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    width:'100%',
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    width: '100%',
    marginBottom: 20,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    backgroundColor: '#f5f8ff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f8ff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    padding: 12,
  },
  loginButton: {
    borderRadius: 8,
    padding: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    maxWidth:'100%',
    marginBottom: 20,
  },
  signupText: {
    color: '#333',
    fontSize: 16,
  },
  signupLink: {
    color: '#F15A24',
    fontWeight: 'bold',
    fontSize: 16,

  },
});

export default LoginScreen;