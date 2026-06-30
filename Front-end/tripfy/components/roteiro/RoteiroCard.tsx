import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Roteiro } from '../../src/types';
import { PRIVACIDADE } from '../../src/constants';
import { StarRating } from '../ui/StarRating';

interface RoteiroCardProps {
  roteiro: Roteiro;
  onPress: (roteiro: Roteiro) => void;
  onFavorite?: (roteiro: Roteiro) => void;
  indisponivel?: boolean;
}

export const RoteiroCard: React.FC<RoteiroCardProps> = ({
  roteiro,
  onPress,
  onFavorite,
  indisponivel = false,
}) => {
  const priv = PRIVACIDADE[roteiro.tipo];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => !indisponivel && onPress(roteiro)}
      className="rounded-md bg-card border border-border shadow-card overflow-hidden"
    >
      {/* Foto Capa */}
      <View className="relative h-40 bg-surface">
        {roteiro.fotoCapa ? (
          <Image
            source={{ uri: roteiro.fotoCapa }}
            className="w-full h-full"
            style={{ aspectRatio: 16 / 9 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center bg-primary/10">
            <Text className="text-[40px]">🗺️</Text>
          </View>
        )}

        {/* Overlay indisponivel */}
        {indisponivel && (
          <View className="absolute inset-0 items-center justify-center bg-black/60">
            <Text
              className="text-heading font-[600] text-white"
              style={{ fontFamily: 'Inter' }}
            >
              Indisponivel
            </Text>
          </View>
        )}

        {/* Badge de privacidade + favoritar */}
        <View className="absolute top-2 right-2 flex-row gap-2">
          <View className="rounded-pill bg-card/90 px-2 py-0.5 flex-row items-center gap-1">
            <Text className="text-sm">{priv.icone}</Text>
            <Text className="text-caption text-text font-[500]" style={{ fontFamily: 'Inter' }}>
              {priv.label}
            </Text>
          </View>
          {onFavorite && !indisponivel && (
            <TouchableOpacity
              onPress={() => onFavorite(roteiro)}
              className="rounded-full bg-card/90 p-1.5"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              aria-label={roteiro.favoritado ? 'Desfavoritar roteiro' : 'Favoritar roteiro'}
            >
              <Text className="text-lg">{roteiro.favoritado ? '♥' : '♡'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Badge colaborativo */}
        {roteiro.tipo === 'COLABORATIVO' && (
          <View className="absolute top-2 left-2 rounded-pill bg-secondary px-2 py-0.5">
            <Text className="text-caption font-[600] text-white" style={{ fontFamily: 'Inter' }}>
              👥 Colaborativo
            </Text>
          </View>
        )}
      </View>

      {/* Conteudo */}
      <View className="p-3 gap-2">
        <Text
          className="text-heading font-[600] text-text"
          style={{ fontFamily: 'Inter' }}
          numberOfLines={1}
        >
          {roteiro.nome}
        </Text>

        {/* Chips de destino */}
        <View className="flex-row flex-wrap gap-1.5">
          {roteiro.destinos.map((destino) => (
            <View key={destino} className="rounded-pill bg-surface border border-border px-2 py-0.5">
              <Text
                className="text-caption text-text font-[500] uppercase"
                style={{ fontFamily: 'Inter' }}
              >
                {destino}
              </Text>
            </View>
          ))}
        </View>

        {/* Autor + Favoritos */}
        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center gap-2">
            <View className="w-7 h-7 rounded-full bg-surface items-center justify-center">
              <Text className="text-sm">👤</Text>
            </View>
            <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
              {roteiro.autor.nome}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-caption text-secondary">♥</Text>
            <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
              {roteiro.totalFavoritos}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};