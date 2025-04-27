import React, { useMemo } from 'react';
import { Text, ScrollView, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RouterUtil } from "@/utility/RouterUtil";
import { StorefrontType } from "@/utility/type/ParamsType";

// const StoreCard = ({ name, imageUrl, deliveryFee, deliveryTime, currency = '₦', isFavorite = false, id, storeName }) => {
//   return (
//     <TouchableOpacity style={styles.storeItem} onPress={() => RouterUtil.navigate<StorefrontType>('dashboard.storeFrontDashboard', { storefrontId: id, storefrontName: storeName })}>
//       <Image
//         source={imageUrl ? imageUrl : require('@/assets/image/defaultstoreimage.jpg') }
//         style={styles.storeImage}
//       />
//       <View style={styles.storeDetails}>
//         <View style={styles.storeNameContainer}>
//           <Text style={styles.storeName} numberOfLines={1}>{name}</Text>
//           <TouchableOpacity>
//             <Ionicons
//               name={isFavorite ? "heart" : "heart-outline"}
//               size={24}
//               color={isFavorite ? "#FF3B30" : "#000"}
//             />
//           </TouchableOpacity>
//         </View>
//         {deliveryFee && deliveryTime && (
//           <View style={styles.storeInfoContainer}>
//             <View style={styles.storeInfo}>
//               <Ionicons name="bicycle" size={16} color="#FF3B30" />
//               <Text style={styles.storeInfoText}>From {currency} {deliveryFee}</Text>
//             </View>
//             <View style={styles.storeInfo}>
//               <Ionicons name="time-outline" size={16} color="#FF3B30" />
//               <Text style={styles.storeInfoText}>{deliveryTime}</Text>
//             </View>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   )
// };
// Wrap the entire component in React.memo for shallow prop comparison
const StoreCard = React.memo(({ name, imageUrl, deliveryFee, deliveryTime, currency = '₦', isFavorite = false, id, storeName }:any) => {
  // Use useMemo for the image source to prevent unnecessary re-creation
  const imageSource = useMemo(() => {
    return imageUrl ? imageUrl : require('@/assets/image/defaultstoreimage.jpg');
  }, [imageUrl]);

  return (
      <TouchableOpacity style={styles.storeItem} onPress={() => RouterUtil.navigate<StorefrontType>('dashboard.storeFrontDashboard', { storefrontId: id, storefrontName: storeName })}>
        <Image
            source={imageSource}
            style={styles.storeImage}
        />
        <View style={styles.storeDetails}>
          <View style={styles.storeNameContainer}>
            <Text style={styles.storeName} numberOfLines={1}>{name}</Text>
            <TouchableOpacity>
              <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#FF3B30" : "#000"}
              />
            </TouchableOpacity>
          </View>
          {deliveryFee && deliveryTime && (
              <View style={styles.storeInfoContainer}>
                <View style={styles.storeInfo}>
                  <Ionicons name="bicycle" size={16} color="#FF3B30" />
                  <Text style={styles.storeInfoText}>From {currency} {deliveryFee}</Text>
                </View>
                <View style={styles.storeInfo}>
                  <Ionicons name="time-outline" size={16} color="#FF3B30" />
                  <Text style={styles.storeInfoText}>{deliveryTime}</Text>
                </View>
              </View>
          )}
        </View>
      </TouchableOpacity>
  );
});
const LoadingCard = () => {
  return (
    <View style={styles.storeItem}>
      <View
        style={styles.storeImage}
      />
      <View style={[styles.storeDetails, { backgroundColor: '#fafafa', marginTop: 10 }]}>
        <View style={styles.storeNameContainer}>
          <Text style={styles.storeName} numberOfLines={1} />

        </View>
        <View style={styles.storeInfoContainer}>
          <View style={styles.storeInfo}>

            <Text style={styles.storeInfoText} />
          </View>
          <View style={[styles.storeInfo]}>
            <Text style={styles.storeInfoText} />
          </View>
        </View>
      </View>
    </View>
  )
}

const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);


export const StoresList = ({ title, stores, loading }) => (
  <>
    <SectionTitle title={title} />
    {stores.length > 0 ?
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storesScrollView}
        contentContainerStyle={styles.storesScrollViewContent}
      >
        {loading ? (
          [1, 2].map((item, index) => (
            <LoadingCard key={`loading-${index}`} />
          ))
        ) : (
          stores?.map((store, index) => (
            <StoreCard
              id={store.storefrontId}
              key={`${title}-${index}`}
              name={store.storefrontName}
              imageUrl={{ uri: store.storefrontImageLink || store.imageUrl }}
              deliveryFee="450"
              deliveryTime="23 - 30 min"
              currency={store.currency}
              isFavorite={false}
              storeName={store.storefrontName}
            />
          ))
        )}
      </ScrollView>
      :
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storesScrollView}
        contentContainerStyle={styles.storesScrollViewContent}
      >
        {[1, 2].map((item, index) => (
          <LoadingCard key={`loading-${index}`} />
        ))}
      </ScrollView>

    }
  </>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'System',
    color: '#000000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#FF3B30',
    marginLeft: 4,
    marginRight: 2,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5EA',
  },
  badgeContainer: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  searchBar: {
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#030337',
    position: 'relative',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
  highlightText: {
    color: '#4CD964',
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  storesScrollView: {
    marginBottom: 24,
  },
  storesScrollViewContent: {
    paddingRight: 16,
  },
  storeItem: {
    width: 260,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',

  },
  storeImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    backgroundColor: '#F2F2F7',
  },
  storeDetails: {
    paddingTop: 5,
  },
  storeNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#000000',
  },
  storeInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 3,
    marginRight: 3
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeInfoText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#333333',
  },
});