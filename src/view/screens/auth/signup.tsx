import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  ScrollView, Platform, StatusBar, ActivityIndicator
} from 'react-native';
import { Link } from 'expo-router';
import {Ionicons} from "@expo/vector-icons";
import { RouterUtil } from '@/utility/RouterUtil';
import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import { RegisterRequest, RegisterRequestType} from "@/model/request/auth/LoginRequest";
import auth from "@/store/modules/auth";
import {showMessage} from "@/utility/hook/useToast";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import { DefaultTextInput } from '@/component/textInput/DefaultTextInput';
import {useAppSelector} from "@/store";

const SignUpScreen = () => {
  const [email, setEmail] = useState('anthony.morah11@gmail.com');
  const [password, setPassword] = useState('••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loginRef, setLoginRef] = useState(RegisterRequest);
  const dispatch = useDispatch();
  const {loading } = useAppSelector(state => state.auth);


  async function handleSubmit (values: RegisterRequestType){

    console.log("response==========", values)

    dispatch(auth.action.register(values)).then((response: any)=> {
      console.log('response====', response)
      if (response.payload.code === "00"){
        RouterUtil.navigate('dashboard.createBusinessScreen', { screen: 'Home Screen' });
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
        
        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>Bringing 21th century transport tech to nigeria schools</Text>

        
        <View style={styles.inputContainer}>
          <DefaultTextInput formik={formik} name={"email"} placeholder={"Enter your email"} label={"Email"} />
        </View>
        
        <View style={styles.inputContainer}>
          <DefaultTextInput secureTextEntry formik={formik} name={"password"} placeholder={"Enter your email"} label={"password"} />
          </View>



        <TouchableOpacity style={styles.loginButton} className={loading ? 'bg-black/20' : 'relative bg-[#F15A24]'} onPress={()=> formik.handleSubmit()} disabled={loading}>
          {loading && (<ActivityIndicator size="small" color={"white"} className="absolute left-0 right-0 top-0 bottom-0" />)}
          <Text style={styles.loginButtonText}>Signup</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => RouterUtil.navigate('auth.login')}>
            <Text style={styles.signupLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ContainerScrollViewLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

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
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign:"center",
    width:'100%'
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
    marginVertical: 20,
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
    textAlign: "center",
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
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
  },
  signupText: {
    color: '#333',
    fontSize:16
  },
  signupLink: {
    color: '#F15A24',
    fontWeight: 'bold',
    fontSize:16

  },
});

export default SignUpScreen;