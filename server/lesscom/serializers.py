from django.conf import settings
from rest_framework import serializers

from .models import CustomUser, CustomUserManager

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, data):
        queryset = CustomUser.objects.filter(email=data)
        if len(queryset) != 0:
            raise serializers.ValidationError('Email is already registered')
        return data

    def validate_password(self, data):
        if len(data) < 6:
            raise serializers.ValidationError('Password must be longer than 6 characters')
        return data
    
    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)