from rest_framework import serializers


class ErrorDetailSerializer(serializers.Serializer):
    code = serializers.CharField()
    detail = serializers.CharField()
    attr = serializers.CharField()


class ErrorSerializer(serializers.Serializer):
    type = serializers.CharField()
    errors = ErrorDetailSerializer(many=True)
