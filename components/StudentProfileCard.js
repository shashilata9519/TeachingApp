import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment, { Moment } from "moment/moment";
import InfoView from "./TeacherInfoView";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import { green } from "@mui/material/colors";


export default function TestingCard(props) {
    
    return <View style={{ padding: 16, backgroundColor: '#FFF', borderRadius: 12, margin: 16, marginTop: 8, marginBottom: 8, width: 350, }}>
        {/* Title */}
        <View style={{alignItems:"center"}}>
        <Image style={{  width: 150, height: 150, borderRadius: 75, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
        <Text style={{ fontSize: 25, fontWeight: 'bold' , paddingTop:20}}>"Teacher's Name"</Text>
        </View>
        <View style={{ flexDirection: 'column', marginBottom: 4 }}>
            {/* <Text style={{ fontSize: 17, fontWeight: 'bold',textAlign:'center' }}>Card 2 (Application card)</Text>
             */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 ,width: 290, }}>
                        <Image style={{  width: 90, height: 90, borderRadius: 45, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                            <View>
                                <Text style={tw` font-bold text-orange-400 text-lg pt-4 `}>Sambit Kumar <Text style={tw`font-normal text-black text-base`}>applied for</Text></Text>
                                <Text style={{ fontSize: 14, fontWeight:'bold' }}>Gandharva Prarambhik Year 1</Text>
                                <View style={{paddingTop: 20, }}>
                                <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300  w-20`}>
                                        <Text style={{fontWeight:"bold", textAlign:"center"}}>Chat ...</Text>
                                </TouchableOpacity> 
                                </View>
                            </View>
                    </View> */}
            <Text style={{paddingTop:10, paddingBottom:10,}}>--------------------------------------------------------------------------</Text>
            <View style={{flexDirection: "column",paddingHorizontal:0}}>
                    <View style={{paddingBottom:15}}>
                    <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Email Address</Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>student@student.com</Text>
                    </View>
                    <View style={{paddingBottom:15}}>
                    <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Phone Number</Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>99997874646</Text>
                    </View>
                    <View style={{paddingBottom:15}}>
                    <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Full Name</Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Student Kumar</Text>
                    </View>
                    <View style={{paddingBottom:15}}>
                    <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Bio</Text>
                    <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>"Hi iam Student"</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal:110, alignItems:"center" }}>
                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300  w-23`}>
                                 <Text style={{fontWeight:"bold", textAlign:"center"}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            
            {/* <View style={{flexDirection: "row",paddingHorizontal:0}}>
                <View style={tw`left-0 top-0`}>
                    <View style={{flexDirection: "column", paddingEnd:55 }}>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Custom Date</Text>
                        <Text style={{fontSize: 14,fontWeight: 'normal', textAlign:"center" }} >Morning</Text>
                    </View>
                </View>
                <View style={{textAlign:"center"}}>
                    <View style={{flexDirection: "column", alignItems: 'center' }}>
                        <Text style={{fontSize: 17, fontWeight: 'bold', paddingBottom:10}}>Fees: Rs5000</Text>
                        <Text style={{fontSize: 17, fontWeight: 'bold' ,paddingBottom:2}}>Application Status</Text>
                        <Text style={{fontSize: 14,fontWeight: 'bold', textAlign:"center", paddingBottom:10}} >Paid</Text>
                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-amber-500 w-30`}>
                            <Text style={{fontWeight:"bold", textAlign:"center"}}>View Details</Text>
                                </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </View>

        {/* class Info  */}
        <View>
        {/* <ScrollView showsHorizontalScrollIndicator={true} horizontal={true}  style={{ borderRadius: 12, marginTop: 8, paddingLeft: 0, paddingRight: 16, marginBottom: 8,}}>
        <TouchableOpacity  style={{ paddingRight: 10, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0}}>
                    <View style={{ paddingRight: 8, padding: 8, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 1</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 2</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 3</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 4</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  
                  
                  </View>
                 
                
                </TouchableOpacity>
              </ScrollView> */}





              {/* Student Info */}
              {/* <ScrollView showsHorizontalScrollIndicator={true} horizontal={true}  style={{ borderRadius: 12, marginTop: 8, paddingLeft: 0, paddingRight: 16, marginBottom: 8,}}>
                <TouchableOpacity style={{ paddingRight: 8, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0, flexDirection: 'row'}}>
                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 1</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 2</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 3</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                </TouchableOpacity>
              </ScrollView> */}

              {/* Action buttons */}
              {/* <View style={{alignItems:"center", paddingTop: 20 , paddingBottom: 0}}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Action</Text>
                    <View style={{flexDirection:"row" ,paddingTop: 8}}>
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-sky-600 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>[]</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-green-700 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>\/</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>Join Class</Text>
                    </TouchableOpacity>           
                    </View>                    
              </View>*/}



        </View> 



        {/* Info */}
        {/* <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 ,width: 290, }}>
            <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
            <View>
                <Text style={{ fontSize: 14 }}>by Jane Doe</Text>
                <Text style={{ fontSize: 14 }}>Guitar</Text>
                <Text style={{ fontSize: 14 }}>3 Classes</Text>
            </View>
        </View>  */}
        {/* Dates */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 4 }}>
            <View>
                <Text style={{ fontSize: 14 }}>Start Date</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment().format("ddd DD MMM, YYYY")}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 14 }}>End Date</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment().format("ddd DD MMM, YYYY")}</Text>
            </View>
        </View> */}
        {/* Fees & Application */}
        {/* <View style={{ marginTop: 4, marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fees:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>₹ 500</Text>
            </View> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14 }}>Application Status:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#e87e39' }}>Applied</Text>
            </View>
        </View> */}
        {/* Schedule */}
        
        {/* Students */}
        
        {/* Actions */}
        {/* <View style={{ height: 44, flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
           
            <View></View>
            <View style={{ backgroundColor: '#3E8493', borderRadius: 12, width: '100%' }}>
                <Pressable >
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#FFFFFF', padding: 12, fontWeight: 'bold' }}>Join Class 2</Text>
                </Pressable>
            </View>
        </View> */}


       
    </View>
}