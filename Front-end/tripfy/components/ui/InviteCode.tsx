import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface InviteCodeProps {
  codigo: string;
  diasRestantes: number;
  onCopy?: () => void;
  onShareWhatsApp?: () => void;
}

export const InviteCode: React.FC<InviteCodeProps> = ({
  codigo,
  diasRestantes,
  onCopy,
  onShareWhatsApp,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View className="rounded-md bg-surface border border-border p-lg gap-md">
      <Text className="text-label text-muted font-[500]" style={{ fontFamily: 'Inter' }}>
        Codigo de convite
      </Text>
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[22px] font-[500] tracking-[3px] text-text"
          style={{ fontFamily: 'JetBrains Mono' }}
        >
          {codigo}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCopy}
          className="rounded-md bg-primary px-4 py-2"
        >
          <Text className="text-label font-[600] text-white" style={{ fontFamily: 'Inter' }}>
            {copied ? 'Copiado!' : 'Copiar'}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-caption text-muted" style={{ fontFamily: 'Inter' }}>
          Valido por {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'}
        </Text>
        {onShareWhatsApp && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onShareWhatsApp}
            className="flex-row items-center gap-1 rounded-md bg-[#25D366] px-3 py-1.5"
          >
            <Text className="text-sm">💬</Text>
            <Text className="text-caption font-[600] text-white" style={{ fontFamily: 'Inter' }}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};